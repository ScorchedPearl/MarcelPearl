package com.project.backend.user;

import com.project.backend.components.Contest;
import com.project.backend.components.Submissions;
import com.project.backend.config.UpdateProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository userRepository;
    private final UpdateProfileService updateProfileService;

    public UserController(UserRepository userRepository, UpdateProfileService updateProfileService) {
        this.userRepository = userRepository;
        this.updateProfileService = updateProfileService;
    }

    @PutMapping("/update-profile")
    public ResponseEntity<Users> updateProfile(@RequestBody EditProfileRequest request) {
        Users updatedUser = updateProfileService.updateUserProfile(request);
        return ResponseEntity.ok(updatedUser);
    }
}