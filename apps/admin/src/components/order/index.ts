enum OrderType {
    INSITU = "SURPLACE",
    DELIVERY = "ADELIVRER",
}
enum OrderState {
    DONE = "TERMINER",
    PENDING = "EN_COURS",
    ERROR = "ERREUR",
}

export { OrderState, OrderType };
