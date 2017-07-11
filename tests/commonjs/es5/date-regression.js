
exports.testDate = function (ASSERT) {
    // This test is flawed.  It depends on your machine being on PST time.  
    // You can make it pass by manually adjusting the GMT time and timezone on the right.
    ASSERT.equal(new Date(1970, 0, 1), "Thu Jan 01 1970 00:00:00 GMT-0800 (PST)");
};

