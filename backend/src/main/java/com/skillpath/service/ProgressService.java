package com.skillpath.service;

import com.skillpath.model.*;
import com.skillpath.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProgressService {
    @Autowired
    private UserProgressRepository progressRepository;
    @Autowired
    private TopicRepository topicRepository;
    @Autowired
    private UserRepository userRepository;

    public void markTopicComplete(Long userId, Long topicId) {
        UserProgress progress = progressRepository.findByUserIdAndTopicId(userId, topicId)
                .orElse(new UserProgress());
        
        if (progress.getId() == null) {
            User user = userRepository.findById(userId).orElseThrow();
            Topic topic = topicRepository.findById(topicId).orElseThrow();
            progress.setUser(user);
            progress.setTopic(topic);
        }
        
        progress.setCompleted(true);
        progress.setCompletedAt(LocalDateTime.now());
        progressRepository.save(progress);
    }

    public Map<String, Double> getSectionProgress(Long userId) {
        List<UserProgress> completedProgress = progressRepository.findByUserIdAndCompleted(userId, true);
        Map<String, Long> completedBySection = completedProgress.stream()
                .collect(Collectors.groupingBy(
                    p -> p.getTopic().getSection(),
                    Collectors.counting()
                ));

        Map<String, Long> totalBySection = topicRepository.findAll().stream()
                .collect(Collectors.groupingBy(Topic::getSection, Collectors.counting()));

        Map<String, Double> progressMap = new HashMap<>();
        for (String section : totalBySection.keySet()) {
            long completed = completedBySection.getOrDefault(section, 0L);
            long total = totalBySection.get(section);
            progressMap.put(section, (double) completed / total * 100);
        }
        
        return progressMap;
    }

    public Set<String> getTodayStudiedSections(Long userId) {
        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        return progressRepository.findByUserIdAndCompletedAtAfter(userId, startOfDay)
                .stream()
                .map(p -> p.getTopic().getSection())
                .collect(Collectors.toSet());
    }
}