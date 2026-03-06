package com.idat.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import com.idat.model.Cita;

public interface CitaService {

    List<Cita> listar();
    long contarCitasHoy();
    long contarPendientes();
    List<Map<String, Object>> citasSemana();
    List<Map<String, Object>> contarPorEstado();
    List<Map<String, Object>> reporteCitasPorPeriodo(LocalDate inicio, LocalDate fin);
    List<Map<String, Object>> reporteCitasPorMedico();
    List<Cita> obtenerPorPaciente(Integer idPaciente);
    Cita guardar(Cita cita);
    void eliminar(Integer id);
}