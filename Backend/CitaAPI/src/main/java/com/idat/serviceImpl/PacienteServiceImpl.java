package com.idat.serviceImpl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.idat.model.Paciente;
import com.idat.repository.PacienteRepository;
import com.idat.service.PacienteService;

@Service
public class PacienteServiceImpl implements PacienteService {

    @Autowired
    private PacienteRepository repository;

    @Override
    public List<Paciente> listar() {
        return repository.findAll();
    }
    
    @Override
    public long contarPaciente() {
    	return repository.count();
    }

    @Override
    public Paciente obtenerPorId(Integer id) {
        return repository.findById(id).orElse(null);
    }
    
    @Override
    public Paciente obtenerPorUsuario(Integer idUsuario) {
        return repository.findByUsuarioIdUsuario(idUsuario);
    }
    
    @Override
    public List<Map<String, Object>> reportePacientesPeriodo(
            LocalDateTime inicio,
            LocalDateTime fin) {

        List<Object[]> datos = repository.contarPacientesPorPeriodo(inicio, fin);

        List<Map<String, Object>> resultado = new ArrayList<>();

        for (Object[] fila : datos) {
            resultado.add(Map.of(
                "fecha", fila[0].toString(),
                "total", ((Number) fila[1]).intValue()
            ));
        }

        return resultado;
    }

    @Override
    public Paciente guardar(Paciente paciente) {
        return repository.save(paciente);
    }

    @Override
    public Paciente actualizar(Integer id, Paciente paciente) {
        paciente.setIdPaciente(id);
        return repository.save(paciente);
    }

    @Override
    public void eliminar(Integer id) {
        repository.deleteById(id);
    }
}