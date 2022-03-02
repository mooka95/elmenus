const options={
    definition: {
        openapi: '3.0.0',
        info: {
          title: 'Library Api',
          version: '1.0.0',
          description: "ElMenus Api Library"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
            ]
      },
      apis: ['./Routes/*.js'], 
    
};

module.exports =options;