# Youtube-API
  After starting the server the database will be poplated asynchronously after every 10 seconds using the search keyword defined under loadVideo() function in controller
  

# Setup
 To run application:
 =>Download the application
 => npm install
 
 => Create a file ".env" => Add Atlas Mongo Db connection link as [MONGO_URI] 
                         => Add Youtube api key as [API_KEY]
 
 => npm start 
 
 
 # Get paginated videos with chronological order
 
 http://localhost:3000/api/v1/video?page=&limit=
 
 # Get video based on search query of title and description
 
 http://localhost:3000/api/v1/video/search?title=&description=
