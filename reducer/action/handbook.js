
export const CHANGE_PRODUCT_TYPE = "CHANGE_PRODUCT_TYPE";
export const change_product_type = (id) =>{
    return {
        type: CHANGE_PRODUCT_TYPE,
        id : id
    }
}

export const CHANGE_SEARCH_TEXT = "CHANGE_SEARCH_TEXT";
export const change_search_text = (text) =>{
    return {
        type: CHANGE_SEARCH_TEXT,
        text : text
    }
}

export const CHANGE_SELECT_ALL_FILTER = "CHANGE_SELECT_ALL_FILTER";
export const select_all_filter = (value) =>{
    return {
        type: CHANGE_SELECT_ALL_FILTER,
        value : value
    }
}

