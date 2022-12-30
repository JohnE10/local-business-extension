let objArr = {name: 'a', url: 'b'};

if (typeof window !== 'undefined') {
    localStorage.setItem('objArr', JSON.stringify(objArr));
  }