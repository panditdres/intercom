const { expect } 	= require('chai');
const FilterHelper  = require('../server/filter/filter.helper')


describe(`getCustomerByDistance`, function() {
	it(`should filter the customers within a certain distance from the Dublin office`, cb => {

		// let the radius be 12km, we know only 1 customer is within that range.
		let radius = 12;

		let query = {
			distance : radius
		}

		FilterHelper.getCustomers(query,resp => {
			let result = resp.data;

			expect(result).to.have.lengthOf(1);
			expect(result[0].user_id).to.equal(4);

			return cb();
		})
		
	})
})