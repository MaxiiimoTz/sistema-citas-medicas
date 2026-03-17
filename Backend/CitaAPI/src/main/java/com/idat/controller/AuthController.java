package com.idat.controller;

import com.idat.model.Usuario;
import com.idat.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        Usuario usuario = usuarioRepository.findByEmail(email);

        if (usuario == null || !usuario.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Credenciales incorrectas");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("token", "demo-token");
        response.put("usuario", usuario);

        return ResponseEntity.ok(response);
    }
}