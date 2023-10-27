export const apiFetch = async (url) => {
  // 지정된 URL에서 데이터를 가져오는 GET 메서드입니다.
            
    try {
      const result = await fetch(url, {
        mode: 'cors',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjIyNTE0M2EzNTg3OGQxY2FkYTdmNjk4YmYwZWZhMCIsInN1YiI6IjY1MmY5OThjYTgwMjM2MDBjMzE2NWQ0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vMiFt7pND4DpoUQnFLKQbI03hux5EyIse35JoMwpfTA',
        },
      });

      if (!result.ok) throw result;

      return await result.json();
    } catch (err) {
      return err;
  }
}