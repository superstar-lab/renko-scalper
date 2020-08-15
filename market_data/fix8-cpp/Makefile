CC := g++

# XTRD-specific code was generated from XML using:
# f8c --namespace XTRD --prefix XTRD --odir src etc/FIX44_XTRD_fix8.xml

# Code produced by f8c generates a large amount of 'unused parameter' and 'missing field initializer' warnings
COMPILER_FLAGS := -Wall -Wextra -pedantic -std=c++17 -O2 -Wno-unused-parameter -Wno-missing-field-initializers

# Build with all warnings visible
# COMPILER_FLAGS := -Wall -Wextra -pedantic -std=c++17 -O2

LINKER_FLAGS := -lfix8 -lpthread -lz -lPocoFoundation -lPocoNet -lPocoUtil -lPocoXML -lPocoNetSSL -lPocoCrypto

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
