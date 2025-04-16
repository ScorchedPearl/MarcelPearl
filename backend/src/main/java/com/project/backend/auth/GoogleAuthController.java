package com.project.backend.auth;

import com.project.backend.config.JwtService;
import com.project.backend.user.Role;
import com.project.backend.user.UserRepository;
import com.project.backend.user.Users;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
public class GoogleAuthController {

    private final GoogleAuthService googleAuthService;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public GoogleAuthController(GoogleAuthService googleAuthService, UserRepository userRepository, JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.googleAuthService = googleAuthService;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/google")
    @Transactional
    public String authenticateWithGoogle(@RequestBody GoogleAuthenticationRequest request) {
        var token = request.getToken();
        GoogleUserDto googleUser = googleAuthService.getGoogleUserInfo(token);
        Optional<Users> userOptional = userRepository.findByMarcelPearlId(googleUser.getEmail());
        Users user = userOptional.orElseGet(() -> {
            var newUser = Users.builder()
                    .marcelPearlId(UUID.randomUUID().toString())
                    .name(googleUser.getName())
                    .email(googleUser.getEmail())
                    .password(passwordEncoder.encode(UUID.randomUUID().toString()))  // Random password
                    .profilePhoto(googleUser.getProfilePicture())
                    .role(Role.USER)
                    .build();
            System.out.println("new user"+newUser);
            return userRepository.save(newUser);
        });
        return jwtService.generateTokenForGoogleUser(user.getName(), user.getEmail(), user.getMarcelPearlId(), user.getProfilePhoto());
    }

}
