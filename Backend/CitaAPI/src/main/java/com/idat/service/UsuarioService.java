package com.idat.service;

import java.util.List;
import com.idat.model.Usuario;

public interface UsuarioService {

    List<Usuario> listar();
    Usuario obtenerPorId(Integer id);
    Usuario guardar(Usuario usuario);
    Usuario cambiarEstado(Integer id, Boolean estado);
    Usuario cambiarPassword(Integer idUsuario, String nuevaPassword);
    Usuario actualizar(Integer id, Usuario usuario);
    void eliminar(Integer id);
}