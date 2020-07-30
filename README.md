# CALMS
ICTAK Project - Citizen Assisted Living Management System website
Important points

A) CALMS website offers services for 2 sets of users.

	1) Clients of the website - Clients are registered using the Register link.
	2) Admin users of the website. 
		Credentials for admin:
		Email: admin@gmail.com
		Password: admin123
B)Token authentication is incorporated for all functionalities. 

C) Clients can subscribe to 2 services. a) Electricity bill payment  b) Lab@ Home 

D) Clients can view their profile (user details and services subscribed ) in Profile page. They can edit their user details.
   They can edit and delete services.

E) Each subscription added by client, generates a task for admin to perform in Tasks page.

F) Only Admin can access Tasks page and Users page. Admin can complete a task after doing necessary followup.
  Admin can also delete a user (which will inturn delete all related services and tasks for that user).

G) When admin completes a task, an email will be sent to the client.
   Note:Please use an functional email id to register as client, so that the email can be received by you after completing a    task as admin user.

H) Payments functionality has not been included. So no mention of payment can be seen anywhere in the site.

I) Cloud Mongo DB has been used. Node modules folders have been removed.

