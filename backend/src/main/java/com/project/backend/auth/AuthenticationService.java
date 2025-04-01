package com.project.backend.auth;

import com.project.backend.config.JwtService;
import com.project.backend.user.Role;
import com.project.backend.user.UserRepository;
import com.project.backend.user.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final ConcurrentHashMap<String, String> resetTokenStore = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, Long> resetTokenExpiry = new ConcurrentHashMap<>();

    public AuthenticationResponse register(RegisterRequest request) {
        var user = Users.builder()
                .username(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public Boolean otpValidate(OtpRequest request) {
        var email = request.getEmail();
        var message= request.getOtp();
        var subject = "OTPVerification";
        return emailService.sendEmail(email,subject,message);
    }

    public void forgotPassword(ForgotPasswordRequest request) {
        Optional<Users> userOpt = repository.findByEmail(request.getEmail());
        if(userOpt.isEmpty()){
            throw new RuntimeException("User with this email does not exist.");
        }
        Users user = userOpt.get();
        String resetToken = UUID.randomUUID().toString();
        resetTokenStore.put(resetToken,user.getEmail());
        resetTokenExpiry.put(resetToken, System.currentTimeMillis() + TimeUnit.HOURS.toMillis(1));

        String resetLink = "http://localhost:3000/reset-password?token=" + resetToken;
        String subject = "Password Reset Request";
        String body = "To reset your password, click the link below:\n" + resetLink;
        emailService.sendEmail(user.getEmail(),subject,body);
    }

    public void resetPassword(ResetPasswordRequest request){
        String token = request.getToken();
        String email = resetTokenStore.get(token);

        if(email == null || resetTokenExpiry.get(token) < System.currentTimeMillis()){
            throw new RuntimeException("Invalid or expired token");
        }

        Optional<Users> userOpt = repository.findByEmail(email);
        if(userOpt.isEmpty()){
            throw new RuntimeException("User not found");
        }
        Users user = userOpt.get();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        repository.save(user);

        resetTokenStore.remove(token);
        resetTokenExpiry.remove(token);
    }
}
