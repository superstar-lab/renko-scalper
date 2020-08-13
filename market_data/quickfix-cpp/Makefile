CC := g++

COMPILER_FLAGS := -Wall -Wextra -pedantic -std=c++17 -O2
LINKER_FLAGS := -lquickfix -lpthread -lxml2 -lz

TARGET := demo

SRCDIR := src

SRCS := $(wildcard $(SRCDIR)/*.cpp)
OBJS := $(patsubst %.cpp,%.o,$(SRCS))

all: $(TARGET)

$(TARGET): $(OBJS)
	$(CC) -o $@ $^ $(LINKER_FLAGS)

%.o: %.cpp
	$(CC) -c $< -o $@ $(COMPILER_FLAGS)

clean:
	rm -rf $(TARGET) $(OBJS)

.PHONY: all clean
