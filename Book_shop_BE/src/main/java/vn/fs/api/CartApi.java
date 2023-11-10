/*
 * (C) Copyright 2022. All Rights Reserved.
 *
 * @author DongTHD
 * @date Mar 10, 2022
*/
package vn.fs.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.fs.entity.Cart;
import vn.fs.repository.CartDetailRepository;
import vn.fs.repository.CartRepository;
import vn.fs.repository.UserRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("api/cart")
public class CartApi {

	@Autowired
	CartRepository cartRepository;

	@Autowired
	CartDetailRepository cartDetailRepository;

	@Autowired
	UserRepository userRepository;

	@GetMapping("/user/{email}")
	public ResponseEntity<Cart> getCartUser(@PathVariable("email") String email) {
		if (!userRepository.existsByEmail(email)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(cartRepository.findByUser(userRepository.findByEmail(email).get()));
	}

	@PutMapping("/user/{email}")
	public ResponseEntity<Cart> putCartUser(@PathVariable("email") String email, @RequestBody Cart cart) {
		if (!userRepository.existsByEmail(email)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(cartRepository.save(cart));
	}

}
