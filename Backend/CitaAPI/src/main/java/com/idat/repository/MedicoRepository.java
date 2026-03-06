package com.idat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.idat.model.Medico;

public interface MedicoRepository extends JpaRepository<Medico, Integer> {
	
	long countByEstado(Boolean estado);
	
}