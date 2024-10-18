package com.empower.etp.controller;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.empower.etp.entity.AuthRequest;
import com.empower.etp.entity.Event;
import com.empower.etp.entity.UserInfo;
import com.empower.etp.entity.UserInfoDetails;
import com.empower.etp.exception.UserNotFoundException;
import com.empower.etp.helper.MyToken;
import com.empower.etp.service.JwtService;
import com.empower.etp.service.UserInfoService;

@RestController
@CrossOrigin(origins = {"http://*","*"})
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserInfoService service;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome this endpoint is not secure";
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserInfo userInfo) {
        return service.addUser(userInfo);
    }
 
    @GetMapping("/user/myProfile/{username}")
    @PreAuthorize("hasAuthority('user')")
    public ResponseEntity<UserInfo> getUserByUsername(@PathVariable("username") String username) {
        Optional<UserInfo> userInfo = service.getUserByUsername(username);
        return userInfo.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/user/userHome")
    @PreAuthorize("hasAuthority('user')")
    public String userHome(@AuthenticationPrincipal UserInfoDetails user) {
    	return "Welcome to User Profile.. You are "+user.getUsername();
    }
    
    @GetMapping("/admin/adminHome")
    @PreAuthorize("hasAuthority('admin')")
    public String adminHome(@AuthenticationPrincipal UserInfoDetails user) {
        return "Welcome to Admin Profile.. You are "+user.getUsername();
    }

    @PostMapping("/generateToken")
    public MyToken authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
        	String name=authentication.getName();
        	Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        	  
        	String token=jwtService.generateToken(authRequest.getUsername());
        	MyToken myToken=new MyToken();
        	myToken.setName(name);
        	myToken.setToken(token);
        	myToken.setAuthorities(authorities);
        	return myToken;
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }
    }
}
