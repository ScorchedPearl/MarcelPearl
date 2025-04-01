package com.project.backend.user;

import com.project.backend.config.UpdateProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UpdateProfileService updateProfileService;

    public UserController(UpdateProfileService updateProfileService) {
        this.updateProfileService = updateProfileService;
    }

    @PutMapping("/update-profile")
    public ResponseEntity<Users> updateProfile(@RequestBody EditProfileRequest request) {
        Users updatedUser = updateProfileService.updateUserProfile(request);
        return ResponseEntity.ok(updatedUser);
    }
}