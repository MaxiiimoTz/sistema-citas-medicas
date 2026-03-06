package com.idat.service;

import java.util.List;
import com.idat.model.Medico;

public interface MedicoService {

    List<Medico> listar();
    Medico guardar(Medico medico);
    void eliminar(Integer id);
    long contarActivos();
}