const a = {

    "type": "template",
  
    "data": {
  
      "template_id": "Id of notification template",
  
      "data": [
  
        {
  
          "phone": "phone_1",
  
          "data": {
  
            "param_name1":
  "param_value1",
  
            "param_name2":
  "param_value2"
  
          }
  
        },
  
        {
  
          "phone": "phone_2",
  
          "data": {
  
            "param_name1":
  "param_value1",
  
            "param_name2":
  "param_value2"
  
          }
  
        }
  
      ]
  
    }
  
  };

  console.log(JSON.stringify(a));

