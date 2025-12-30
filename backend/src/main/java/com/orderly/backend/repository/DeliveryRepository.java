package com.orderly.backend.repository;

import com.orderly.backend.entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for Delivery entity
 */
@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {

    Optional<Delivery> findByOrderId(Long orderId);

    List<Delivery> findByDeliveryBoyId(Long deliveryBoyId);

    List<Delivery> findByAssignmentStatus(Delivery.DeliveryStatus status);

    @Query("SELECT d FROM Delivery d WHERE d.assignmentStatus = :status ORDER BY d.createdAt ASC")
    List<Delivery> findUnassignedDeliveries(@Param("status") Delivery.DeliveryStatus status);
}
