package com.example.ktpcrud.repository;

import com.example.ktpcrud.model.Ktp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KtpRepository extends JpaRepository<Ktp, Integer> {
    Optional<Ktp> findByNomorKtp(String nomorKtp);
    boolean existsByNomorKtp(String nomorKtp);
}
