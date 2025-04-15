package com.project.backend.auth;

import com.project.backend.config.JwtService;
import com.project.backend.user.Role;
import com.project.backend.user.UserRepository;
import com.project.backend.user.Users;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

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
    public String authenticateWithGoogle(@RequestBody GoogleAuthenticationRequest request) {
        var token=request.getToken();
        GoogleUserDto googleUser = googleAuthService.getGoogleUserInfo(token);
        Optional<Users> userOptional = userRepository.findByEmail(googleUser.getEmail());
        Users user = userOptional.orElseGet(() -> {
            var newUser = Users.builder()
                    .username(googleUser.getName())
                    .email(googleUser.getEmail())
                    .password(passwordEncoder.encode("hello*world"))
                    .profilePhoto(googleUser.getProfilePicture())
                    .role(Role.USER)
                    .build();
            return userRepository.save(newUser);
        });
        System.out.println(user.getUsername());
        return jwtService.generateTokenForGoogleUser(user.getEmail(), user.getUsername(), user.getProfilePhoto());
    }
}
