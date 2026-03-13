package com.example.ktpcrud.controller;

import com.example.ktpcrud.dto.KtpDto;
import com.example.ktpcrud.service.KtpService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ktp")
@CrossOrigin(origins = "*")
public class KtpController {

    @Autowired
    private KtpService ktpService;

    @PostMapping
    public ResponseEntity<KtpDto> createKtp(@Valid @RequestBody KtpDto ktpDto) {
        return new ResponseEntity<>(ktpService.createKtp(ktpDto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<KtpDto>> getAllKtp() {
        return ResponseEntity.ok(ktpService.getAllKtp());
    }

    @GetMapping("/{id}")
    public ResponseEntity<KtpDto> getKtpById(@PathVariable Integer id) {
        return ResponseEntity.ok(ktpService.getKtpById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<KtpDto> updateKtp(@PathVariable Integer id, @Valid @RequestBody KtpDto ktpDto) {
        return ResponseEntity.ok(ktpService.updateKtp(id, ktpDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteKtp(@PathVariable Integer id) {
        ktpService.deleteKtp(id);
        return ResponseEntity.noContent().build();
    }
}
