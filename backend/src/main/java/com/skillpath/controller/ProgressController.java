package com.skillpath.controller;

import com.skillpath.model.Topic;
import com.skillpath.repository.TopicRepository;
import com.skillpath.repository.UserRepository;
import com.skillpath.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ProgressController {
    @Autowired
    private ProgressService progressService;
    @Autowired
    private TopicRepository topicRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/topics/{section}")
    public List<Topic> getTopicsBySection(@PathVariable String section) {
        return topicRepository.findBySection(section);
    }

    @PostMapping("/progress/{userId}/{topicId}")
    public ResponseEntity<?> markComplete(@PathVariable Long userId, @PathVariable Long topicId) {
        progressService.markTopicComplete(userId, topicId);
        return ResponseEntity.ok(Map.of("message", "Topic marked as complete"));
    }

    @GetMapping("/progress/{userId}")
    public Map<String, Double> getProgress(@PathVariable Long userId) {
        return progressService.getSectionProgress(userId);
    }

    @GetMapping("/daily/{userId}")
    public ResponseEntity<?> getDailyProgress(@PathVariable Long userId) {
        return ResponseEntity.ok(Map.of("sections", progressService.getTodayStudiedSections(userId)));
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        return userRepository.findByUsername(username)
                .map(user -> ResponseEntity.ok(Map.of("id", user.getId(), "username", user.getUsername())))
                .orElse(ResponseEntity.notFound().build());
    }
}