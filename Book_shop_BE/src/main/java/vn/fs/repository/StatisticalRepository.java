/*
 * (C) Copyright 2022. All Rights Reserved.
 *
 * @author DongTHD
 * @date Mar 10, 2022
*/
package vn.fs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import vn.fs.entity.Product;

@Repository
public interface StatisticalRepository extends JpaRepository<Product, Long> {

	@Query(value = "select sum(amount), month(order_date) from orders where year(order_date) = ? and status = 2 group by month(order_date)", nativeQuery = true)
	List<Object[]> getMonthOfYear(int year);

	@Query(value = "select year(order_date) from orders group by year(order_date)", nativeQuery = true)
	List<Integer> getYears();

	@Query(value = "select sum(amount) from orders where year(order_date) = ? and status = 2", nativeQuery = true)
	Double getRevenueByYear(int year);

	@Query(value = "select sum(p.sold), c.category_name, (p.price*sum(p.sold)-(p.discount)*sum(p.sold)) from categories c\r\n"
			+ "join products p on p.category_id = c.category_id\r\n"
			+ "group by c.category_name order by sum(p.sold) desc", nativeQuery = true)
	List<Object[]> getCategoryBestSeller();

}
