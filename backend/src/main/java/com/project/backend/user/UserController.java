package com.project.backend.user;

import com.project.backend.config.JwtService;
import com.project.backend.config.UpdateProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserRepository userRepository;
    private final UpdateProfileService updateProfileService;
    public UserController(UserRepository userRepository, UpdateProfileService updateProfileService, JwtService jwtService) {
        this.userRepository = userRepository;
        this.updateProfileService = updateProfileService;
    }

    @PutMapping("/update-profile")
    public ResponseEntity<Users> updateProfile(@RequestBody EditProfileRequest request) {
        Users updatedUser = updateProfileService.updateUserProfile(request);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/current-user")
    public ResponseEntity<Optional<Users>> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        System.out.println(userDetails.getUsername());
        var username= userDetails.getUsername();
        var currentUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
        return ResponseEntity.ok(Optional.ofNullable(currentUser));
    }
}