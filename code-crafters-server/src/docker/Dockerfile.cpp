FROM gcc:11
WORKDIR /app
COPY . /app
RUN g++ -o main main.cpp
CMD ["./main"]
