package com.project.backend.config;

import com.project.backend.user.EditProfileRequest;
import com.project.backend.user.UserRepository;
import com.project.backend.user.Users;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UpdateProfileService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UpdateProfileService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public Users updateUserProfile(EditProfileRequest request) {
        String marcelPearlId = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = userRepository.findByMarcelPearlId(marcelPearlId)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        if(request.getName()!=null && !request.getName().isBlank()) {
            user.setName(request.getName());
        }

        if (request.getEmail() != null && !request.getEmail().isBlank()) {
            if (!request.getEmail().equals(user.getEmail())) {
                throw new RuntimeException("You are not allowed to change email.");
            }
        }

        if(request.getBio()!=null && !request.getBio().isBlank()) {
            user.setBio(request.getBio());
        }

        if(request.getProfilePhoto()!=null && !request.getProfilePhoto().isBlank()) {
            user.setProfilePhoto(request.getProfilePhoto());
        }

        if (request.getCurrentPassword() != null && request.getNewPassword() != null) {
            if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
                throw new RuntimeException("Current Password is incorrect");
            }
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        }

        return userRepository.save(user);
    }
}
