package com.empower.etp.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.empower.etp.entity.UserInfo;
import com.empower.etp.entity.UserInfoDetails;
import com.empower.etp.exception.UserNotFoundException;
import com.empower.etp.repository.UserInfoRepository;

@Service
public class UserInfoService implements UserDetailsService {

    @Autowired
    private UserInfoRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UserNotFoundException {
    	UserInfo userInfo = repository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User with username " + username + " not found"));
    	return new UserInfoDetails(userInfo);
    }

    public ResponseEntity<String> addUser(UserInfo userInfo) {
        Optional<UserInfo> existingUser = repository.findById(userInfo.getUsername());

        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                                 .body("User already exists");
        }

        try {
            userInfo.setPassword(encoder.encode(userInfo.getPassword()));
            repository.save(userInfo);
            return ResponseEntity.status(HttpStatus.CREATED)
                                 .body("User Added Successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error occurred while saving the user: " + e.getMessage());
        }
    }

    public Optional<UserInfo> getUserByUsername(String username) {
        return repository.findByUsername(username);
    }

    public UserInfo findUserByUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }
}
