package com.idat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.idat.model.Medico;
import com.idat.service.MedicoService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/medicos")
public class MedicoController {

    @Autowired
    private MedicoService service;

    @GetMapping
    public List<Medico> listar() {
        return service.listar();
    }
    
    @GetMapping("/activos/count")
    public long contarActivos() {
    	return service.contarActivos();
    }

    @PostMapping
    public Medico guardar(@RequestBody Medico medico) {
        return service.guardar(medico);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        service.eliminar(id);
    }
}