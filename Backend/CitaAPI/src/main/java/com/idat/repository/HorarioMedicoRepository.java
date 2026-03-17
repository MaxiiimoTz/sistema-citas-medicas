package com.idat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.idat.model.HorarioMedico;

public interface HorarioMedicoRepository extends JpaRepository<HorarioMedico, Integer> {

    HorarioMedico findByMedicoIdMedicoAndDiaSemana(Integer idMedico, String diaSemana);

}