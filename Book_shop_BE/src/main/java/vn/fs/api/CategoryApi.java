/*
 * (C) Copyright 2022. All Rights Reserved.
 *
 * @author DongTHD
 * @date Mar 10, 2022
*/
package vn.fs.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.fs.entity.Category;
import vn.fs.repository.CategoryRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("api/categories")
public class CategoryApi {

	@Autowired
	CategoryRepository repo;

	@GetMapping
	public ResponseEntity<List<Category>> getAll() {
		return ResponseEntity.ok(repo.findAll());
	}

	@GetMapping("{id}")
	public ResponseEntity<Category> getById(@PathVariable("id") Long id) {
		if (!repo.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(repo.findById(id).get());
	}

	@PostMapping
	public ResponseEntity<Category> post(@RequestBody Category category) {
		if (repo.existsById(category.getCategoryId())) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(repo.save(category));
	}

	@PutMapping("{id}")
	public ResponseEntity<Category> put(@RequestBody Category category, @PathVariable("id") Long id) {
		if (!id.equals(category.getCategoryId())) {
			return ResponseEntity.badRequest().build();
		}
		if (!repo.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(repo.save(category));
	}

	@DeleteMapping("{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
		if (!repo.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		repo.deleteById(id);
		return ResponseEntity.ok().build();
	}

}
