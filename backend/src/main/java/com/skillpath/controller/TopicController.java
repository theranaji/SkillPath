package com.skillpath.controller;

import com.skillpath.model.Topic;
import com.skillpath.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/topics")
@CrossOrigin(origins = "http://localhost:3000")
public class TopicController {
    @Autowired
    private TopicRepository topicRepository;

    @GetMapping("/{section}")
    public ResponseEntity<?> getTopicsBySection(@PathVariable String section) {
        try {
            java.util.List<Topic> topics = topicRepository.findBySection(section);
            return ResponseEntity.ok(topics);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addTopic(@RequestBody Map<String, String> request) {
        try {
            Topic topic = new Topic();
            topic.setName(request.get("name"));
            topic.setSection(request.get("section"));
            topic.setDescription(request.get("description"));
            
            Topic savedTopic = topicRepository.save(topic);
            return ResponseEntity.ok(savedTopic);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/bulk-add")
    public ResponseEntity<?> addBulkTopics(@RequestBody Map<String, Object> request) {
        try {
            String section = (String) request.get("section");
            @SuppressWarnings("unchecked")
            java.util.List<Map<String, String>> topics = (java.util.List<Map<String, String>>) request.get("topics");
            
            for (Map<String, String> topicData : topics) {
                Topic topic = new Topic();
                topic.setName(topicData.get("name"));
                topic.setSection(section);
                topic.setDescription(topicData.get("description"));
                topicRepository.save(topic);
            }
            
            return ResponseEntity.ok(Map.of("message", "Topics added successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}