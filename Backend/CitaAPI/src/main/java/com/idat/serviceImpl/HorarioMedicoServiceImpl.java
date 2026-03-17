package com.idat.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idat.model.HorarioMedico;
import com.idat.repository.HorarioMedicoRepository;
import com.idat.service.HorarioMedicoService;

@Service
public class HorarioMedicoServiceImpl implements HorarioMedicoService {

    @Autowired
    private HorarioMedicoRepository repository;

    @Override
    public List<HorarioMedico> listar() {
        return repository.findAll();
    }

    @Override
    public HorarioMedico guardar(HorarioMedico h) {
        return repository.save(h);
    }
}