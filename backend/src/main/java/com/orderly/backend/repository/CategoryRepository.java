package com.orderly.backend.repository;

import com.orderly.backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for Category entity
 */
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByName(String name);

    List<Category> findByIsActiveTrue();

    List<Category> findByParentIdIsNull();

    List<Category> findByParentId(Long parentId);
}
