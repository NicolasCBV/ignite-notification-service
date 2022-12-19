# Notification service
### About
This was one api created on ignite lab event hosted by the educational institute Rocketseat.Furthermore, this app is able to create, update, delete and get the notifications storaged on database using the main principles of clean architeture, using domain drive desing, mappers, factories, in memory database TDD and more.

### Usage
To use this api is very simple, you could access the url of a service and use the respect endpoint: 

Base url: https://ignite-notification-service.onrender.com/

To create new notification: 

	/notifications - method: post    
	Espected content in json: 
		content: string  
		category: string  	
		recipientId: uuid version 4  

To get one notification:  

	/notifications/from/:recipientId - method: get   

To read or unread one notification:  

	/notifications/:id/read - method: patch   
	/notifications/:id/unread - method: patch  

To count how many notifications exists:		 

	/notifications/count/from/:recipientId - method: get	

To cancel one notification: 

	/notifications/:id/cancel - method: patch 
