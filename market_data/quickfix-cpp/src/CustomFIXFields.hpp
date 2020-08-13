#ifndef CUSTOM_FIX_HEADERS_HPP
#define CUSTOM_FIX_HEADERS_HPP

#include "quickfix/Field.h"

namespace FIX {
    USER_DEFINE_INT(PricePrecision, 5001);
    USER_DEFINE_INT(SizePrecision, 5002);
    USER_DEFINE_INT(AggressorSide, 2446);
}

#endif
