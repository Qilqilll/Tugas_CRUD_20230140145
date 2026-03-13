package com.example.ktpcrud.service.impl;

import com.example.ktpcrud.dto.KtpDto;
import com.example.ktpcrud.model.Ktp;
import com.example.ktpcrud.repository.KtpRepository;
import com.example.ktpcrud.service.KtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class KtpServiceImpl implements KtpService {

    @Autowired
    private KtpRepository ktpRepository;

    @Override
    public KtpDto createKtp(KtpDto ktpDto) {
        if (ktpRepository.existsByNomorKtp(ktpDto.getNomorKtp())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Nomor KTP sudah terdaftar");
        }
        Ktp ktp = mapToEntity(ktpDto);
        Ktp savedKtp = ktpRepository.save(ktp);
        return mapToDto(savedKtp);
    }

    @Override
    public List<KtpDto> getAllKtp() {
        return ktpRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public KtpDto getKtpById(Integer id) {
        Ktp ktp = ktpRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "KTP tidak ditemukan"));
        return mapToDto(ktp);
    }

    @Override
    public KtpDto updateKtp(Integer id, KtpDto ktpDto) {
        Ktp existingKtp = ktpRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "KTP tidak ditemukan"));

        if (!existingKtp.getNomorKtp().equals(ktpDto.getNomorKtp()) && ktpRepository.existsByNomorKtp(ktpDto.getNomorKtp())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Nomor KTP sudah terdaftar");
        }

        existingKtp.setNomorKtp(ktpDto.getNomorKtp());
        existingKtp.setNamaLengkap(ktpDto.getNamaLengkap());
        existingKtp.setAlamat(ktpDto.getAlamat());
        existingKtp.setTanggalLahir(ktpDto.getTanggalLahir());
        existingKtp.setJenisKelamin(ktpDto.getJenisKelamin());

        Ktp updatedKtp = ktpRepository.save(existingKtp);
        return mapToDto(updatedKtp);
    }

    @Override
    public void deleteKtp(Integer id) {
        if (!ktpRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "KTP tidak ditemukan");
        }
        ktpRepository.deleteById(id);
    }

    private Ktp mapToEntity(KtpDto dto) {
        return Ktp.builder()
                .id(dto.getId())
                .nomorKtp(dto.getNomorKtp())
                .namaLengkap(dto.getNamaLengkap())
                .alamat(dto.getAlamat())
                .tanggalLahir(dto.getTanggalLahir())
                .jenisKelamin(dto.getJenisKelamin())
                .build();
    }

    private KtpDto mapToDto(Ktp entity) {
        return KtpDto.builder()
                .id(entity.getId())
                .nomorKtp(entity.getNomorKtp())
                .namaLengkap(entity.getNamaLengkap())
                .alamat(entity.getAlamat())
                .tanggalLahir(entity.getTanggalLahir())
                .jenisKelamin(entity.getJenisKelamin())
                .build();
    }
}
