package com.idat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import com.idat.model.Cita;
import com.idat.service.CitaService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/citas")
public class CitaController {

    @Autowired
    private CitaService service;

    @GetMapping
    public List<Cita> listar() {
        return service.listar();
    }
    
    @GetMapping("/hoy/count")
    public long contarCita() {
    	return service.contarCitasHoy();
    }
    
    @GetMapping("/pendientes/count")
    public long contarPendientes() {
    	return service.contarPendientes();
    }
    
    @GetMapping("/semana")
    public List<Map<String, Object>> citasSemana(){
    	return service.citasSemana();
    }
    
    @GetMapping("/estado")
    public List<Map<String, Object>> estadoCitas(){
    	return service.contarPorEstado();
    }
    
    @GetMapping("/reporte/periodo")
    public List<Map<String, Object>> reporteCitasPorPeriodo(
    		@RequestParam("inicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
    		@RequestParam("fin") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fin
    ){
    	return service.reporteCitasPorPeriodo(inicio, fin);
    }
    
    @GetMapping("/reporte/medico")
    public List<Map<String, Object>> reporteCitasPorMedico() {
        return service.reporteCitasPorMedico();
    }
    
    @GetMapping("/paciente/{id}")
    public List<Cita> citasPaciente(@PathVariable Integer id) {
        return service.obtenerPorPaciente(id);
    }

    @PostMapping
    public Cita guardar(@RequestBody Cita cita) {
        return service.guardar(cita);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        service.eliminar(id);
    }
}