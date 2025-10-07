package com.skillpath.repository;

import com.skillpath.model.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    Optional<UserProgress> findByUserIdAndTopicId(Long userId, Long topicId);
    List<UserProgress> findByUserIdAndCompleted(Long userId, boolean completed);
    
    @Query("SELECT up FROM UserProgress up WHERE up.user.id = ?1 AND up.completedAt >= ?2")
    List<UserProgress> findByUserIdAndCompletedAtAfter(Long userId, LocalDateTime date);
}