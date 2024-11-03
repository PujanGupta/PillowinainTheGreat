**Setup Backend**

*For Server with ML Model*

On MacOS

```
python3 -m venv venv;
source venv/bin/activate;
python3 -m pip install -r requirements.txt;

```


*Start Server*
```
flask run app.py
```

**Setup Frontend**

   ```
   cd ./website/;
   npm ci;
   npm install serve;
   npx serve -s build;
   ```
   
