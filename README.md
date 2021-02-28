# Turing web


## Install locally the project
 > :warning: each step is necessary 
    
1. **prerequisite**

    To install this project you must have docker install, 
    to check if it is install on your computer :
    ```
    docker version
    ```
    if it is not, check out on [Docker](https://docs.docker.com/get-docker/) how to install it.
2. **installation**

    ```bash
    git clone git@gitshare.cls.fr:s1oceanstudy/turing_web.git
    
    cd turing_web/
    # --build only necessary the first time or if you edit the docker config 
    docker-compose up --build
    ```
3. **API key creation**

    The next step is the API key, indeed if you want to make request to the API you need a key 
    To generate a key you can use our django custom command.
    ```bash
    docker-compose run api sh -c "python manage.py generate_api_key"
    # return a key like this one QXxnkB1V.btMH4unFvCvHxi4Az7MpAEcr9FqeT3ZZ
    ```
    If you want to make somme test, put in the header of your api request the Api key like that :
    ```bash
    Authorization : Api-Key QXxnkB1V.btMH4unFvCvHxi4Az7MpAEcr9FqeT3ZZ
    #here it is an exmple of api key
    ```
4. **set up the front**

    In order to finish the installation of the project you have to **add a fil .env** in your folder /turing_web
    and in this file write put your api key like that :
    ```bash
    API_KEY=QXxnkB1V.btMH4unFvCvHxi4Az7MpAEcr9FqeT3ZZ 
    #here it is an exmple of api key
    ```
   thanks to that your front is able to make call to your api
5. **Running the project**

    To start the project you have to run :
    ```bash
    cd turing_web/
    docker-compose up
    ```
    Your project is now running at this address : 
    - [front](http://localhost:3000/)
    - [back](http://localhost:8000/)
    
    To shut down the project it is **ctrl+c**
6. **upload images**

     > :warning: you project must be running if you want to upload images 
                   
    If you want to have locally a 100% functional version of the application you need to upload some image.
    In order to do that we have create a python script. You will find it in the folder **HelperPy**. 
    The easiest way to do this is to run it in a venv (we provide a requirements.txt to make it easy).
    
    ```bash
    python3 -m venv ./.env
    source ./.env/bin/activate
    pip install -r requirements.txt
    ```
    To be functional your script need to have the **API-KEY**. So you have to change in **HelperPy/apiConfig.py** the function api_header()
    ```bash
    def api_header():
        return {"Authorization": "Api-Key PUT-YOUR-API-KEY"}
    ```
    the environment is now well set up to execute the script.
    This script is designed to work with a folder of the following form:
    
    ```
    +---the folder
    |   +-- Image type name 1 (like Iceberg)
    |       +--image iceberg 1
    |       +--image iceberg 2
    |       +--image iceberg 3
    |   +-- Image type name 2
    |       +--image type2 1
    |       +--image type2 2
    |       +--image type2 3
   
    |   ...
    ```
    The script will ask you the path to the folder and the version and will then upload the images
    ```bash
    > python uploadImg.py
    Folder path: /your_path/to_the_folder/with_the_images/Fake_Images
    Version of the images (if real 0): 1
    ```
    If all goes well you must see print like that for each image:
    ```bash
    {"id":1502,"version":1,"type":"Waves","image":"http://localhost:8000/media/image/network-snapshot-007750_Ocean_Waves_810.png"}
    ```


- ***(optional)* django backoffice** 

    Thanks to django you have access to a backoffice, so you have a good view of our back.
    To access to this backoffice you have to first create a superuser :
    
    ```bash
    docker-compose run api sh -c "python manage.py createsuperuser"
    ```
    You will have to choose your user name and your password
    Then you can access to backoffice a this [address](http://localhost:8000/api/admin/) 
