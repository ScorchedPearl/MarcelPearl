package com.project.backend.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EditProfileRequest {

    private String username;

    private String email;

    private String bio;

    private String profilePhoto;

    private String currentPassword;

    private String newPassword;
}
