package com.idat.serviceImpl;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idat.model.Cita;
import com.idat.repository.CitaRepository;
import com.idat.service.CitaService;

@Service
public class CitaServiceImpl implements CitaService {

    @Autowired
    private CitaRepository repository;

    @Override
    public List<Cita> listar() {
        return repository.findAll();
    }
    
    @Override
    public long contarCitasHoy() {
    	return repository.countByFecha(LocalDate.now());
    }
    
    @Override
    public long contarPendientes() {
    	return repository.countByEstado("Pendiente");
    }
    
    @Override
    public List<Map<String, Object>> citasSemana() {

        // Rango: lunes a sábado de la semana actual
        LocalDate inicio = LocalDate.now().with(DayOfWeek.MONDAY);
        LocalDate fin = inicio.plusDays(6);

        // Resultado crudo desde SQL
        List<Object[]> datos = repository.contarCitasPorSemana(inicio, fin);

        // Resultado parcial (solo días con citas)
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (Object[] fila : datos) {
            int dia = ((Number) fila[0]).intValue();
            long total = ((Number) fila[1]).longValue();

            String nombreDia = switch (dia) {
                case 2 -> "Lun";
                case 3 -> "Mar";
                case 4 -> "Mié";
                case 5 -> "Jue";
                case 6 -> "Vie";
                case 7 -> "Sáb";
                default -> "Dom";
            };

            resultado.add(Map.of(
                "dia", nombreDia,
                "citas", total
            ));
        }

        // rellenar días sin citas -----

        List<String> diasSemana = List.of("Lun", "Mar", "Mié", "Jue", "Vie", "Sáb");

        // Mapa ordenado con todos los días en 0
        Map<String, Long> mapa = new LinkedHashMap<>();
        for (String d : diasSemana) {
            mapa.put(d, 0L);
        }

        // Sobrescribimos con los valores reales
        for (Map<String, Object> fila : resultado) {
            mapa.put(
                (String) fila.get("dia"),
                (Long) fila.get("citas")
            );
        }

        // Convertimos al formato que usa el frontend
        return mapa.entrySet().stream()
        	    .map(e -> {
        	        Map<String, Object> fila = new java.util.HashMap<>();
        	        fila.put("dia", e.getKey());
        	        fila.put("citas", e.getValue());
        	        return fila;
        	    })
        	    .collect(java.util.stream.Collectors.toList());
    }
    
    @Override
    public List<Map<String, Object>> contarPorEstado(){
    	Map<String, Long> estados = new java.util.LinkedHashMap<>();
    	estados.put("Atendidas", 0L);
    	estados.put("Pendientes", 0L);
    	estados.put("Reprogramadas", 0L);
    	estados.put("Canceladas", 0L);

    	estados.put("Atendidas", repository.countByEstado("Atendida"));
    	estados.put("Pendientes", repository.countByEstado("Pendiente"));
    	estados.put("Canceladas", repository.countByEstado("Cancelada"));
    	estados.put("Reprogramadas", repository.countByEstado("Reprogramada"));
    	
    	List<Map<String, Object>> resultado = new ArrayList<>();
    	
    	estados.forEach((k, v) -> {
    		Map<String, Object> fila = new java.util.HashMap<>();
    		fila.put("nombre", k);
    		fila.put("valor", v);
    		resultado.add(fila);
    	});
    	
    	return resultado;
    }
    
    @Override
    public List<Map<String, Object>> reporteCitasPorPeriodo(LocalDate inicio, LocalDate fin) {

        List<Object[]> datos = repository.contarCitasPorEstadoYFecha(inicio, fin);

        Map<String, Long> mapa = new HashMap<>();

        mapa.put("Atendida", 0L);
        mapa.put("Pendiente", 0L);
        mapa.put("Reprogramada", 0L);
        mapa.put("Cancelada", 0L);

        for (Object[] fila : datos) {
            String estado = (String) fila[0];
            Long total = (Long) fila[1];
            mapa.put(estado, total);
        }

        List<Map<String, Object>> resultado = new ArrayList<>();

        mapa.forEach((estado, total) -> {
            resultado.add(Map.of(
                "estado", estado,
                "total", total
            ));
        });

        return resultado;
    }
    
    @Override
    public List<Map<String, Object>> reporteCitasPorMedico() {

        List<Object[]> datos = repository.contarCitasPorMedico();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (Object[] fila : datos) {
            resultado.add(Map.of(
                "medico", fila[0],
                "total", fila[1]
            ));
        }

        return resultado;
    }
    
    @Override
    public List<Cita> obtenerPorPaciente(Integer idPaciente) {
        return repository.obtenerCitasPorPaciente(idPaciente);
    }

    @Override
    public Cita guardar(Cita cita) {
        return repository.save(cita);
    }

    @Override
    public void eliminar(Integer id) {
        repository.deleteById(id);
    }
    
}