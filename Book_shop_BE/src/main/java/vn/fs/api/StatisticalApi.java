/*
 * (C) Copyright 2022. All Rights Reserved.
 *
 * @author DongTHD
 * @date Mar 10, 2022
*/
package vn.fs.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.fs.dto.CategoryBestSeller;
import vn.fs.dto.Statistical;
import vn.fs.entity.Order;
import vn.fs.entity.Product;
import vn.fs.repository.OrderRepository;
import vn.fs.repository.ProductRepository;
import vn.fs.repository.StatisticalRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/statistical")
public class StatisticalApi {

	@Autowired
	StatisticalRepository statisticalRepository;

	@Autowired
	OrderRepository orderRepository;

	@Autowired
	ProductRepository productRepository;

	@GetMapping("{year}")
	public ResponseEntity<List<Statistical>> getStatisticalYear(@PathVariable("year") int year) {
		List<Object[]> list = statisticalRepository.getMonthOfYear(year);
		List<Statistical> listSta = new ArrayList<>();
		List<Statistical> listReal = new ArrayList<>();
		for (int i = 0; i < list.size(); i++) {
			Statistical sta = new Statistical((int) list.get(i)[1], null, (Double) list.get(i)[0], 0);
			listSta.add(sta);
		}
		for (int i = 1; i < 13; i++) {
			Statistical sta = new Statistical(i, null, 0.0, 0);
			for (int y = 0; y < listSta.size(); y++) {
				if (listSta.get(y).getMonth() == i) {
					listReal.remove(sta);
					listReal.add(listSta.get(y));
					break;
				} else {
					listReal.remove(sta);
					listReal.add(sta);
				}
			}
		}
		return ResponseEntity.ok(listReal);
	}

	@GetMapping("/countYear")
	public ResponseEntity<List<Integer>> getYears() {
		return ResponseEntity.ok(statisticalRepository.getYears());
	}

	@GetMapping("/revenue/year/{year}")
	public ResponseEntity<Double> getRevenueByYear(@PathVariable("year") int year) {
		return ResponseEntity.ok(statisticalRepository.getRevenueByYear(year));
	}

	@GetMapping("/get-all-order-success")
	public ResponseEntity<List<Order>> getAllOrderSuccess() {
		return ResponseEntity.ok(orderRepository.findByStatus(2));
	}

	@GetMapping("/get-category-seller")
	public ResponseEntity<List<CategoryBestSeller>> getCategoryBestSeller() {
		List<Object[]> list = statisticalRepository.getCategoryBestSeller();
		List<CategoryBestSeller> listCategoryBestSeller = new ArrayList<>();
		for (int i = 0; i < list.size(); i++) {
			CategoryBestSeller categoryBestSeller = new CategoryBestSeller(String.valueOf(list.get(i)[1]),
					Integer.valueOf(String.valueOf(list.get(i)[0])), Double.valueOf(String.valueOf(list.get(i)[2])));
			listCategoryBestSeller.add(categoryBestSeller);
		}
		return ResponseEntity.ok(listCategoryBestSeller);
	}

	@GetMapping("/get-inventory")
	public ResponseEntity<List<Product>> getInventory() {
		return ResponseEntity.ok(productRepository.findByStatusTrueOrderByQuantityDesc());
	}

}
