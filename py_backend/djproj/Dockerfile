# Step 1: Use the official Python image from Docker Hub as the base image
FROM python:3.9-slim


# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the requirements file (you need to create this file next)
COPY requirements.txt /app/

# Step 4: Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: Copy the rest of your Django project files into the container
COPY . /app/

# Step 6: Expose the port your app runs on (default Django port is 8000)
EXPOSE 8000

# Step 7: Run the Django app
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]