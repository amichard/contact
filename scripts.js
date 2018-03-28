angular.module('contacts', [])
	.service('Contact', function () {
		/**
		 * Inserts the contact into the table
		 * 
		 * @param {} Contact
		 * @return {} Contact
		 */
		this.add = function (model) {
			var contacts = this.get_all();
			var id = this.get_last_id() + 1;

			contacts.push({
				"id": id,
				"person_id": model.person_id,
				"contact_type": model.contact_type,
				"contact_value": model.contact_value
			});

			localStorage.setItem('CONTACTS', JSON.stringify(contacts));

			return this.get(id);
		};

		/**
		 * Retrieves the record from the table
		 * 
		 * @param Int ID
		 * @return {} Contact
		 */
		this.get = function (id) {
			var contacts = this.get_all();

			return contacts.find(function (contact) {
				return contact.id == id;
			});
		};

		/**
		 * Retrieves all of the contacts from the table
		 * 
		 * @return [] Array of Contacts 
		 */
		this.get_all = function () {
			return JSON.parse(localStorage.getItem('CONTACTS'));
		};

		/**
		 * Retrieves all of the contacts for a specific person
		 * 
		 * @param Int Person ID
		 * @return [] Array of Contacts 
		 */
		this.get_for_person = function (person_id) {
			var contacts = this.get_all();
			return contacts.filter(function (contact) {
				return contact.person_id == person_id;
			});
		};

		/**
		 * Get specific type of contact for a person
		 * 
		 * @param Int Person ID
		 * @param String Type
		 * @return [] Array of Contacts
		 */
		this.get_type_for_person = function (person_id, type) {
			var contacts = this.get_for_person(person_id);
			return contacts.filter(function (contact) {
				return contact.contact_type == type;
			});
		};

		/**
		 * Gets the last inserted ID.
		 * Returns 0 if the table is empty
		 * 
		 * @return Integer
		 */
		this.get_last_id = function () {
			var contacts = this.get_all();

			if (contacts.length > 0) {
				return contacts[contacts.length - 1].id;
			} else {
				return 0
			}
		};
	})
	.service('ContactForm', ['Contact', 'Person', 'Subscription', function (Contact, Person, Subscription) {
		/**
		 * Inserts the form input into the models
		 * 
		 * @param {} Request
		 * @return Void
		 */
		this.add = function (request) {
			var person = Person.add({
				"first_name": request.first_name,
				"last_name": request.last_name
			});

			var contact = Contact.add({
				"person_id": person.id,
				"contact_type": "email",
				"contact_value": request.email_address
			});

			var contact = Contact.add({
				"person_id": person.id,
				"contact_type": "phone",
				"contact_value": request.phone_number
			});

			var contact = Contact.add({
				"person_id": person.id,
				"contact_type": "address",
				"contact_value": request.mailing_address
			});

			if (request.subscribe_activities) {
				var subscription = Subscription.add({
					"person_id": person.id,
					"type": "activities"
				});	
			}

			if (request.subscribe_booklet) {
				var subscription = Subscription.add({
					"person_id": person.id,
					"type": "booklet"
				});	
			}

			if (request.subscribe_classes) {
				var subscription = Subscription.add({
					"person_id": person.id,
					"type": "classes"
				});	
			}
		};

		/**
		 * Validates the form to make sure all the required fields are filled.
		 * 
		 * @param {} Request
		 * @return [] Validation Errors
		 */
		this.validate = function (request) {
			var validation_errors = [];

			if (request.email_address == null) {
				validation_errors.push('email_address');
			}

			if (request.first_name == null) {
				validation_errors.push('first_name');
			}

			if (request.last_name == null) {
				validation_errors.push('last_name');
			}

			if (request.mailing_address == null) {
				validation_errors.push('mailing_address');
			}

			if (request.phone_number == null) {
				validation_errors.push('phone_number');
			}

			return validation_errors;
		};
	}])
	.service('Person', function () {
		/**
		 * Inserts the person into the table
		 * 
		 * @param {} Person
		 * @return {} Person
		 */
		this.add = function (model) {
			var people = this.get_all();
			var id = this.get_last_id() + 1;

			people.push({
				"id": id,
				"first_name": model.first_name,
				"last_name": model.last_name
			});

			localStorage.setItem('PEOPLE', JSON.stringify(people));

			return this.get(id);
		};

		/**
		 * Retrieves the person from the table
		 * 
		 * @param Int ID
		 * @return {} Person
		 */
		this.get = function (id) {
			var people = this.get_all();

			return people.find(function (person) {
				return person.id == id;
			});
		};

		/**
		 * Retrieves all of the people from the table
		 * 
		 * @return [] Array of People 
		 */
		this.get_all = function () {
			return JSON.parse(localStorage.getItem('PEOPLE'));
		};

		/**
		 * Gets the last inserted ID.
		 * Returns 0 if the table is empty
		 * 
		 * @return Integer
		 */
		this.get_last_id = function () {
			var people = this.get_all();

			if (people.length > 0) {
				return people[people.length - 1].id;
			} else {
				return 0;
			}
		};
	})
	.service('Subscription', function () {
		/**
		 * Inserts the subscription into the table
		 * 
		 * @param {} Subscription
		 * @return {} Subscription
		 */
		this.add = function (model) {
			var subscriptions = this.get_all();
			var id = this.get_last_id() + 1;

			subscriptions.push({
				"id": id,
				"person_id": model.person_id,
				"type": model.type
			});

			localStorage.setItem('SUBSCRIPTIONS', JSON.stringify(subscriptions));

			return this.get(id);
		};

		/**
		 * Retrieves the subscription from the table
		 * 
		 * @param Int ID
		 * @return {} Model
		 */
		this.get = function (id) {
			var subscriptions = this.get_all();

			return subscriptions.find(function (subscription) {
				return subscription.id == id;
			});
		};

		/**
		 * Retrieves all of the subscriptions from the table
		 * 
		 * @return [] Array of Subscriptions 
		 */
		this.get_all = function () {
			return JSON.parse(localStorage.getItem('SUBSCRIPTIONS'));
		};

		/**
		 * Retrieves all of the subscriptions for a specific person
		 * 
		 * @param Int Person ID
		 * @return [] Array of Subscriptions 
		 */
		this.get_for_person = function (person_id) {
			var subscriptions = this.get_all();
			return subscriptions.filter(function (subscription) {
				return subscription.person_id == person_id;
			});
		};

		/**
		 * Gets the last inserted ID.
		 * Returns 0 if the table is empty
		 * 
		 * @return Integer
		 */
		this.get_last_id = function () {
			var subscriptions = this.get_all();

			if (subscriptions.length > 0) {
				return subscriptions[subscriptions.length - 1].id;
			} else {
				return 0;
			}
		};
	})
	.controller('AddContactController', ['ContactForm', function(ContactForm) {
		/**
		 * Upon form submission
		 * 
		 * @return Boolean
		 */
		this.submit = function () {
			this.validation_errors = ContactForm.validate(this);

			if (this.validation_errors.length > 0) {
				return false;
			} else {
				ContactForm.add(this);
				this.submitted = true;

				document.getElementById("contactForm").reset();

				return this.submitted;
			}
		};
	}])
	.controller('ListContactController', ['Contact', 'Person', 'Subscription', function(Contact, Person, Subscription) {
		/**
		 * Upon form submission
		 * 
		 * @return Boolean|Void
		 */
		this.load = function () {
			this.people = Person.get_all();

			this.people.forEach(function (person) {
				person.email_addresses = Contact.get_type_for_person(person.id, 'email');
				person.phone_numbers = Contact.get_type_for_person(person.id, 'phone');
				person.mailing_addresses = Contact.get_type_for_person(person.id, 'address');
				person.subscriptions = Subscription.get_for_person(person.id);
			});
		};
	}])
	.controller('TestController', ['Contact', 'Person', 'Subscription', function (Contact, Person, Subscription) {
		this.load = function () {
			//TEST ADD PERSON
			var person = Person.add({
				"first_name": "Richard",
				"last_name": "Tan"
			});

			if (person) {
				this.add_person = true;
			} else {
				this.add_person = false;
			}

			//TEST ADD EMAIL
			var email = Contact.add({
				"person_id": person.id,
				"contact_type": "email",
				"contact_value": "richard.tan@gov.bc.ca"
			});

			if (email && email.person_id == person.id) {
				this.add_email = true;
			} else {
				this.add_email = false;
			}

			//TEST ADD PHONE
			var phone = Contact.add({
				"person_id": person.id,
				"contact_type": "phone",
				"contact_value": "2501234567"
			});

			if (phone && phone.person_id == person.id) {
				this.add_phone = true;
			} else {
				this.add_phone = false;
			}

			//TEST ADD ADDRESS
			var address = Contact.add({
				"person_id": person.id,
				"contact_type": "address",
				"contact_value": "2970 Jutland Rd"
			});

			if (address && address.person_id == person.id) {
				this.add_address = true;
			} else {
				this.add_address = false;
			}

			//TEST ADD SUBSCRIPTION
			var subscription = Subscription.add({
				"person_id": person.id,
				"type": "activities"
			});	

			if (subscription && subscription.person_id == person.id) {
				this.add_subscription = true;
			} else {
				this.add_subscription = false;
			}
		};
	}])
	.run(function () {
		localStorage.setItem('CONTACTS', JSON.stringify([]));
		localStorage.setItem('PEOPLE', JSON.stringify([]));
		localStorage.setItem('SUBSCRIPTIONS', JSON.stringify([]));
	});