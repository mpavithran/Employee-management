### API Documentation

- Get All Employee

  ```jsx
  Base URL: http://localhost:3001/api/v1/employee/employees
  Method: POST

  **Request body:**
  {}

  **Response:**
  {
      "statusCode": 200,
      "message": "success",
      "data": [
          {
              "id": 1,
              "name": "Pavithran",
              "age": 12,
              "position": "Dev",
              "department": "Engineering",
              "mailId": "mapvithran1998@gmail.com",
              "mobileNumber": 9876543210,
              "createdDatetime": "2025-01-14T16:40:41.000Z",
              "status": 1
          },
          {
              "id": 2,
              "name": "Pavithran",
              "age": 12,
              "position": "Dev",
              "department": "Engineering",
              "mailId": "mapvithran1998@gmail.com",
              "mobileNumber": 9876543210,
              "createdDatetime": "2025-01-14T16:44:01.000Z",
              "status": 1
          }
      ]
  }
  ```

- Add Employee Details

  ```jsx
  Base URL: http://localhost:3001/api/v1/employee/employees
  Method: GET

  **Request body:**
  {
      "name": "Pavithran",
      "age": 12,
      "position": "Dev",
      "department": "Engineering",
      "mail": "mapvithran1998@gmail.com",
      "mobileNumber": 9876543210
  }

  **Response:**
  {
      "statusCode": 200,
      "message": "success",
      "data": "Employee Detail added successfully"
  }
  ```

- Get Single Employee Details

  ```jsx
  Base URL: http://localhost:3001/api/v1/employee/employees/:id
  Method: GET
  Parameters: id (int)

  **Request body:**
  {}

  **Response:**
  {
      "statusCode": 200,
      "message": "success",
      "data": {
          "id": 1,
          "name": "Pavithran",
          "age": 12,
          "position": "Dev",
          "department": "Engineering",
          "mailId": "mapvithran1998@gmail.com",
          "mobileNumber": "9876543210",
          "createdDatetime": "2025-01-14T16:40:41.000Z",
          "status": 1
      }
  }
  ```

- Update Employee Details

  ```jsx
  Base URL: http://localhost:3001/api/v1/employee/employees/:id
  Method: PUT
  Parameters: id (int)

  **Request body:**
  {
      "name": "Pavithran",
      "age": 12,
      "position": "Dev",
      "department": "Engineering",
      "mail": "mapvithran1998@gmail.com",
      "mobileNumber": 9876543210
  }

  **Response:**
  {
      "statusCode": 200,
      "message": "success",
      "data": {
          "id": 4,
          "name": "Pavithran",
          "age": 12,
          "position": "Dev",
          "department": "Engineering",
          "mailId": "mapvithran1998@gmail.com",
          "mobileNumber": 9876543210,
          "createdDatetime": "2025-01-15T07:18:39.000Z",
          "status": 1
      }
  }
  ```

- Delete Employee Details

  ```jsx
  Base URL: http://localhost:3001/api/v1/employee/employees/:id
  Method: DELETE
  Parameters: id (int)

  **Request body:**
  {}

  **Response:**
  {
      "statusCode": 200,
      "message": "success",
      "data": "Employee Detail deleted successfully"
  }
  ```

- Track API’s

  ```jsx
  Base URL: http://localhost:3001/api/v1/employee/track
  Method: POST

  **Request body:**
  {
      "url":"http://localhost:3001/api/v1/employee/employees/2",
      "method":"PUT",
      "request":"{'mail':'mapvithran1998@gmail.com'}",
      "response":"{'statusCode':200,'message':'success','data':{'id:2,'name':'Pavithran','age':12,'position':'Dev','department':'Engineering','mailId':'mapvithran1998@gmail.com','mobileNumber':9876543210,'createdDatetime':'2025-01-14T16:44:01.000Z','status':1}}",
      "statusCode":200,
      "status":"SUCCESS"
  }

  **Response:**
  {
      "statusCode": 200,
      "message": "success",
      "data": "Tracking added"
  }
  ```
